export interface CreateUserDto {
  email: string;
  name: string;
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
}

export interface CreatePostDto {
  title: string;
  content?: string;
  published?: boolean;
  authorId: number;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  published?: boolean;
}
