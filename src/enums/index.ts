export enum RedisKey {
    OnlineUsers = 'online-users',
    UserRooms = 'user-rooms',
    SavedDocuments = 'saved-documents',
}


export enum RetryTime {
    Init = 0,
    Ten = 10
}

export enum TimeToLive {
    TenSeconds = 10,
    OneMinute = 60,
    OneMinuteMillisecond = 60 * 1000,
    OneHour = 60 * 60,
    OneDay = 60 * 60 * 24,
    TwoMinutes = 60 * 2,
    TwoMinutesMillisecond = 60 * 2 * 1000,
}

export enum ResourceTypeEnum {
    Image,
    Video,
    Audio,
    File,
  }
