import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Watchlist} from "./model/watchlist.model";
import {CreateAssetResponse} from "./response";

@Injectable()
export class WatchlistService {

    constructor(@InjectModel(Watchlist) private readonly watchlistRepository : typeof Watchlist){
    }

    async createAsset(user,dto): Promise<CreateAssetResponse> {
        try {
            const watchlist = {
                user:user.id,
                name:dto.name,
                assetId: dto.assetId
            }
            await  this.watchlistRepository.create(watchlist)
            return watchlist
        }
        catch (e){
            throw new Error(e)
        }
    }

    async deleteAsset (userId:number,assetId:string) {
       try {
           return this.watchlistRepository.destroy({where:{id:assetId,user:userId}})
       }
       catch (e){
           throw new Error(e)
       }
    }
}
