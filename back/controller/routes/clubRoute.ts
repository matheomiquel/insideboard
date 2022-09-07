import { CreateRoute } from '@controller/routes'
import { ClubService } from '@controller/services'
export class ClubRoute {
    private readonly clubService: ClubService
    private readonly createRoute: CreateRoute
    private readonly endpoint = 'club'
    constructor({ clubService, createRoute }: { clubService: ClubService, createRoute: CreateRoute }) {
        this.clubService = clubService;
        this.createRoute = createRoute;

        this.createRoute.createRoute({
            method: 'get',
            path: `/${this.endpoint}`,
            handler: this.clubService.getAll,
            context: this.clubService
        })
        this.createRoute.createRoute({
            method: 'post',
            path: `/${this.endpoint}`,
            handler: this.clubService.create,
            context: this.clubService
        })
        this.createRoute.createRoute({
            method: 'put',
            path: `/${this.endpoint}/:id`,
            handler: this.clubService.update,
            context: this.clubService
        })
        this.createRoute.createRoute({
            method: 'delete',
            path: `/${this.endpoint}/:id`,
            handler: this.clubService.delete,
            context: this.clubService
        })
    }
}