export interface IPost {
	postId?: string;
	title?: string;
	votesUp: number;
	images: string[];
	tags: string[];
	timestamp: Date;
	votesDown: number;
	userId: string;
	text: string;
}
