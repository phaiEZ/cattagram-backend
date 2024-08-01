export class CommentDto {
  id: string;
  text: string;
  created: Date;
  update: Date;
  user: {
    id: string;
    username: string;
    profilePic: string;
  };
  catxId: string;
}
