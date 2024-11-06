export class CreateBlogDto {
  title: string;
  content: string;
  userId: number;
  tags?: string[];
}
