import { Record } from '../database/record';

export class MediaObj extends Record {
    public id: string ;
    public type: string;
    public ctime: number;
    public text: string;
    public tags: any;
    public images: any;
    public videos: any;
    public like: number;
    public comment: number;
    public location: string;

    public get standardImage(): string {
        return this.images["standard_resolution"];
    }

    public get height(): number {
        return 530;
    }

    public get width(): number {
        let image = this.images["standard_resolution"];
        return (image.width / image.height) * this.height;
    }
}
