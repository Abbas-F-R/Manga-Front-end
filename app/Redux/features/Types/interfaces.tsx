import { Status } from "./enums";

// Pagination interface

export interface PageResponse<T> {
  data?: T[];          
  pagesCount: number; 
  currentPage: number; 
  totalCount: number; 
  isLast: boolean;     
}








// Category interface

export interface CategoryRequest {
  name: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
}

export interface CategoryFilter {
  Name?: string;
  PageNumber?: number;
  PageSize?: number;
}









// Chapter Interfaces

export interface ChapterResponse {
  chapterNumber: number;
  imagesPath: string[];
  mangaId: string;
  Title: string;
}

export interface ChapterPageResponse {
  id: string;
  chapterNumber: number;
}

export interface ChapterRequest {
  chapterNumber: number;
  imagesPath: string[];
  mangaId: string;
}

export interface ChapterFilter {
  mangaId?: string;
  pageNo?: number;
}

export interface ChapterUpdate {
  data: ChapterRequest;
  id: string;
}









// Manga Interfaces

export interface MangaResponse {
  title: string;
  artist: string;
  author: string;        // تم التصحيح هنا
  status: Status;
  coverImage: string;
  description: string;    // تم التصحيح هنا
  tagName: string[]; 
  categoriesName: string[];
  rateNumber: number;
  views: number;
  yearOfIssue: string
}

export interface MangaPageResponse {
  id: string ;
  title: string ;
  coverImage: string ;
  chapterNumber: number[] ;
  chapterId: string[] ;
  creationDate: string[] ;
  rateNumber: number;
}

export interface MangaRequest {
  title: string;
  author: string; 
  artist: string;        
  status: Status;
  coverImage: string;
  description: string;
  yearOfIssue?: string;    
}

export interface MangaFilter {
  title?: string;
  author?: string; 
  artist?: string;     
  status?: Status | undefined;    
  categoryId?: string;
  orderByViews?: boolean;
  orderByUpdatingDate?: boolean;
  userId?: string;
  yearOfIssue?: string;
  pageNo?: number;
  pageSize?: number;
}

export interface MangaUpdate {
  data: MangaRequest;
  id: string;
}
 






// files interface
export interface FileRequest {
  files: File[]
}







// user interface
export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  username: string;
  token: string;
}
export interface UserResponse {
  id: string;
  name: string;
  username: string;
  imageProfile: string;
}
export interface UserFilter {
  Name?: string;
  PageNumber?: number;
  PageSize?: number; 
}
export interface RegisterRequest {
  name: string;
  username: string;
  password: string;
}
export interface AddImageRequest {
  profileImage: string;
}







// Search interface
export interface SearchResponse {
  id: string;
  title: string;
  coverImage: string;
  RateNumber: number;
}

export interface SearchFilter {
  title?: string;
}






// Rate Interface 
export interface RateDto {
  id: string;
  rateNumber: number; 
}
export interface RateForm {
  rateNumber: number; 
  mangaId: string;
}









// comment interface

export interface CommentResponse {
  commentText: string;
  likeCount: number;
 
}
export interface CommentForm {
  commentText: string;
  chapterId: string;
}
export interface CommentUpdate {
  data: { commentText: string};
  id: string;
}
export interface CommentPageResponse {
  id: string; 
  commentText: string;
  likeCount: number; 
  createdAt: string;
}
export interface CommentFilter {
  chapterId?: string;
  pageNo?: number;
  pageSize?: number;
}










// Like Interface

export interface LikeResponse {
 isLike: boolean;
}
