type AttachmentField = keyof Attachment;

export type Attachment = {
    id?: string,
    filename?: string,
    mime_type?: string,
    created_date?: string,
    created_by?: {
        id: string
    }
}

export type BoardField = keyof Board;

export type Board = {
    id?: string,
    name?: string,
    columns?: Array<Column>,
    archived_columns?: Array<Column>,
    invited_members?: Array<BoardMember>,
    members?: Array<BoardMember>,
    archived_date?: string,
    labels?: Array<Label>,
    created_date?: string,
    created_by?: {
        id: string
    }
};

export type BoardMember = {
    id?: string,
    role?: string,
    username?: string
}

type CardFields = keyof Card;

export type Card = {
    id?: string,
    name?: string,
    position?: number,
    description?: {
        created_by?: {
            id: string
        },
        created_date?: string,
        text?: string,
        updated_by?: {
            id: string
        }
        updated_date?: string,
    },
    board_id?: string,
    column_id?: string,
    created_date?: string,
    updated_date?: string,
    archived_date?: string,
    assignees?: Array<{id: string}>,
    labels?: Array<{id: string, name: string}>,
    due_date?: string,
    comment_count?: number,
    attachment_count?: number,
    completed_task_count?: number,
    total_task_count?: number,
    created_by?: {
        id: string
    },
}

export type Column = {
    id?: string,
    name?: string,
    position?: number,
    archived_date?: string,
    created_date?: string,
    created_by?: {
        id: string
    }
}

type CommentField = keyof Comment;

export type Comment = {
    board_id?: string,
    card_id?: string,
    created_by?: {
        id: string
    },
    created_date?: string,
    id?: string,
    text?: string,
    updated_by?: {
        id: string
    },
    updated_date?: string
}

export type Label = {
    id?: string,
    name?: string,
    color?: {
        r?: number,
        g?: number,
        b?: number,
        a?: number
    },
    created_date?: string,
    created_by?: {
        id: string
    }
}

type UserField = keyof User;

export type User = {
    id?: string,
    name?: string,
    username?: string,
    email?: string
}

interface SortOptions {
    /**
     * @default 'asc'
     */
    sort?: 'asc' | 'desc'
}

export interface PageOptions {
    /**
     * @default 1
     */
    page?: number,
    /**
     * @default 50
     */
    per_page?: number
}

export interface GetBoardOptions {
    /**
     * @default ['name']
     */
    fields?: Array<BoardField>
}

export interface GetAllBoardOptions extends PageOptions, GetBoardOptions, SortOptions {
    /**
     * @param {boolean} [archived=false]
     */
    archived?: boolean
}

export interface GetCardOptions {
    fields: Array<CardFields>
}

export interface GetAttachmentOptions {
    fields: Array<AttachmentField>
}

export interface GetCommentOptions {
    fields: Array<CommentField>
}

export interface GetUserOptions {
    fields: Array<UserField>
}
