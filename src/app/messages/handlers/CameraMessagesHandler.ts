import * as fs from 'fs';
import { TimeHelper } from '../../../common';
import { IMessageHandler, MessageHandler } from '../../../networking';
import { CameraPriceEvent, CameraSaveEvent, CameraThumbnailEvent } from '../incoming';
import { CameraPriceComposer, CameraThumbnailSavedComposer, CameraUrlComposer } from '../outgoing';

export class CameraMessagesHandler extends MessageHandler implements IMessageHandler
{
    protected onInit(): void
    {
        this.registerEvent(new CameraPriceEvent(this.onCameraPriceEvent.bind(this)));
        this.registerEvent(new CameraSaveEvent(this.onCameraSaveEvent.bind(this)));
        this.registerEvent(new CameraThumbnailEvent(this.onCameraThumbnailEvent.bind(this)));
    }

    private onCameraPriceEvent(event: CameraPriceEvent): void
    {
        if(!(event instanceof CameraPriceEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.processComposer(new CameraPriceComposer());
    }

    private onCameraSaveEvent(event: CameraSaveEvent): void
    {
        if(!(event instanceof CameraSaveEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        const pictureName   = `${ user.id }_${ room.id }_${ TimeHelper.currentTimestamp }`;
        const fileName      = `${ process.env.CAMERA_PATH }${ pictureName }.png`;

        try
        {
            if(fs.existsSync(fileName)) return;

            fs.writeFile(fileName, event.getParser().picture.toBuffer(), 'binary', err =>
            {
                if(err) throw err;

                user.processComposer(new CameraUrlComposer(`${ pictureName }.png`));
            });
        }
        
        catch(err)
        {
            this.logger.error(err.message || err, err.stack);
        }
    }

    private onCameraThumbnailEvent(event: CameraThumbnailEvent): void
    {
        if(!(event instanceof CameraThumbnailEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        if(!room.security.isOwner(user)) return;

        const pictureName   = `thumbnail_${ room.id }`;
        const fileName      = `${ process.env.CAMERA_PATH }/thumbnails/${ pictureName }.png`;

        try
        {
            fs.writeFile(fileName, event.getParser().picture.toBuffer(), 'binary', err =>
            {
                if(err) throw err;

                user.processComposer(new CameraThumbnailSavedComposer());
            });
        }
        
        catch(err)
        {
            this.logger.error(err.message || err, err.stack);
        }
    }
}