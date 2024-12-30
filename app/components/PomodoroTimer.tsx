// app/components/PomodoroTimer.tsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

interface TimerProps {
  defaultWorkTime?: number;
  defaultBreakTime?: number;
}

const MINUTE_IN_SECONDS = 60;
const CIRCLE_RADIUS = 70;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default function PomodoroTimer({
  defaultWorkTime = 25,
  defaultBreakTime = 5
}: TimerProps) {
  const WORK_TIME = useMemo(() => defaultWorkTime * MINUTE_IN_SECONDS, [defaultWorkTime]);
  const BREAK_TIME = useMemo(() => defaultBreakTime * MINUTE_IN_SECONDS, [defaultBreakTime]);

  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [lastPressed, setLastPressed] = useState<string>('');

  const handleTimerComplete = useCallback(() => {
    if (isBreak) {
      setTimeLeft(WORK_TIME);
      setIsBreak(false);
      setSessions(prev => prev + 1);
    } else {
      setTimeLeft(BREAK_TIME);
      setIsBreak(true);
    }
  }, [isBreak, WORK_TIME, BREAK_TIME]);

  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(WORK_TIME);
    setIsBreak(false);
    setSessions(0);
  }, [WORK_TIME]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, handleTimerComplete]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch(event.key.toLowerCase()) {
        case ' ':
          event.preventDefault();
          toggleTimer();
          setLastPressed('SPACE');
          break;
        case 'r':
          event.preventDefault();
          resetTimer();
          setLastPressed('R');
          break;
        case 'b':
          event.preventDefault();
          if (!isBreak) {
            setIsBreak(true);
            setTimeLeft(BREAK_TIME);
            setLastPressed('B');
          }
          break;
        case 'w':
          event.preventDefault();
          if (isBreak) {
            setIsBreak(false);
            setTimeLeft(WORK_TIME);
            setLastPressed('W');
          }
          break;
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleTimer, resetTimer, isBreak, WORK_TIME, BREAK_TIME]);

  // Clear last pressed key
  useEffect(() => {
    if (lastPressed) {
      const timer = setTimeout(() => {
        setLastPressed('');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lastPressed]);

  const progress = useMemo(() => {
    const total = isBreak ? BREAK_TIME : WORK_TIME;
    return ((total - timeLeft) / total) * CIRCLE_CIRCUMFERENCE;
  }, [timeLeft, isBreak, WORK_TIME, BREAK_TIME]);

  return (
    <div className="w-96 mx-auto p-6 rounded-lg shadow-lg bg-zinc-800">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-50 mb-4">
          {isBreak ? 'Break Time' : 'Work Time'}
        </h2>
        
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              className="text-zinc-700"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r={CIRCLE_RADIUS}
              cx="96"
              cy="96"
            />
            <circle
              className={`${isBreak ? 'text-green-500' : 'text-blue-500'} ${
                isRunning ? 'transition-all duration-1000' : 'transition-none'
              }`}
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={CIRCLE_RADIUS}
              cx="96"
              cy="96"
              strokeDasharray={CIRCLE_CIRCUMFERENCE}
              strokeDashoffset={CIRCLE_CIRCUMFERENCE - progress}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-4xl text-zinc-50 font-bold">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={toggleTimer}
            className={`p-3 rounded-full ${
              isRunning 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            } text-white transition-colors`}
            aria-label={isRunning ? 'Pause timer' : 'Start timer'}
          >
            {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-zinc-600 hover:bg-zinc-700 text-white transition-colors"
            aria-label="Reset timer"
          >
            <RefreshCw className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm text-zinc-50">
            Sessions completed: <span className="font-semibold">{sessions}</span>
          </div>
          <div className="text-sm text-zinc-50">
            Current mode: <span className="font-semibold">{isBreak ? 'Break' : 'Focus'}</span>
          </div>
          
          {/* Keyboard shortcuts info */}
          <div className="text-xs text-gray-400 mt-4 space-y-1">
            <div>Keyboard Shortcuts:</div>
            <div>Space: Start/Pause</div>
            <div>R: Reset Timer</div>
            <div>B: Skip to Break</div>
            <div>W: Skip to Work</div>
            {lastPressed && (
              <div className="text-blue-500 font-medium mt-2">
                Last pressed: {lastPressed}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}