export interface Scene {
  id: number;
  title: string;
  text: string;
  durationLabel: string;
  visualType: 'intro' | 'text-focus' | 'illustration' | 'code' | 'outro';
  visualData?: any;
}

export interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
}
