export interface Tag {
	id: number;
	name: string;
	color: string;
	created_at: string;
	updated_at: string;
}

export interface ListTagsResponse {
	data: Array<Tag>
}

export interface CreateTagRequest {
	name: string;
	color?: string;
}

export interface CreateTagResponse {
	data: Tag
}

export interface UpdateTagRequest {
	name?: string;
	color?: string;
}