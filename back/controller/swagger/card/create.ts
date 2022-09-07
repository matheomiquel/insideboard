import { CardCreateSchema } from '@controller/schema'
import { tags } from '../tags'
import { badRequestSchema, notFoundSchema, unauthorizedSchema } from '../error'
import { formattingBody } from '../formatting'
import { endpoint } from './endpoint'
const createCardSwagger = {
    [`/${endpoint}/acceptFriendRequest`]: {
        post: {
            security: {
                bearerAuth: []
            },
            tags: [tags.card.name],
            description: "Accept a friend request",
            requestBody: formattingBody({ description: "Accept a friend request", schema: CardCreateSchema }),
            produces: ["application/json"],
            responses: {
                204: {
                    description: 'request send, no body',
                },
                400: { ...formattingBody({ description: "Error in request body", schema: badRequestSchema }) },
                404: { ...formattingBody({ description: "friend request not found", schema: notFoundSchema }) },
            }
        }
    }
}
export { createCardSwagger }