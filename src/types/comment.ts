export type Comment =
{
    id: string;
    date: string;
    user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
    };
    comment: string;
    rating: number;
};
export type CommentList = Comment[];
export type CommentPost =
{
    rating:number;
    comment:string;
    id: string;
}
