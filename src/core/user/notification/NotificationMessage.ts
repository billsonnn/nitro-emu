export class NotificationMessage
{
    public static INVALID_PLACEMENT = `You can't place that item here`;
    public static NO_RIGHTS         = NotificationMessage.INVALID_PLACEMENT;
    public static INVALID_ROTATION  = NotificationMessage.INVALID_PLACEMENT;
    public static INVALID_ITEM      = `That item couldn't be found`;
    public static ITEM_EXISTS       = `That item is already in the room`;
    public static MAX_DIMMERS       = `There can only be one dimmer per room`;
    public static NO_EDITING        = `Editing is disabled in this room`;
}