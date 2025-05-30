export type Role = 'red' | 'blue' | 'neutral' | 'assassin';

export interface WordTile {
  word: string;
  role: Role;
  revealed: boolean;
}
