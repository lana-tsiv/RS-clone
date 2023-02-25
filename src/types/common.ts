export interface IPost {
  displayName?: string;
  email?: string;
  postId?: string;
  title?: string;
  votesUp: number;
  images?: string[];
  tags?: string[];
  timestamp: Date | number;
  votesDown: number;
  userId: string;
  text: string;
}

export interface ICommunity {
  displayName: string;
  description: string;
  users: string[];
  posts: IPost[];
}

export interface ModalProps {
  className?: string;
  component: React.ComponentType<any>;
  isConfirmModalNeeded?: boolean;
  isDirtyForm?: boolean;
  onClose: () => void;
  outerProps?: Record<string, any>;
  title?: string;
  width?: string;
  withScrollableContent?: boolean;
  minWidth?: string;
}
