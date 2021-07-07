// export class MessageDto {
//   attachments: []
//   author: {normalizedUserName: "ADMIN", normalizedEmailAddress: "ADMIN@ASPNETBOILERPLATE.COM", concurrencyStamp: "cbb2a1a5-b32d-48e1-81bd-a5451bb28590", tokens: null, deleterUser: null, …}
//   channel: {name: "TestCh1", admin: {…}, id: 1}
//   content: "asasdasdasd"
//   dateTime: "2021-06-19T18:06:13.700152Z"
//   emojis: []
//   id: 8
// }
import {ChannelDto, UserDto} from "@shared/service-proxies/service-proxies";

export class NewUserInChannelDto {
  channel: ChannelDto;
  userDto: UserDto;

  init(_data?: any) {
    if (_data) {
      this.userDto = _data["userDto"] ? UserDto.fromJS(_data["userDto"]) : <any>undefined;
      this.channel = _data["channel"] ? ChannelDto.fromJS(_data["channel"]) : <any>undefined;
    }
  }

  static fromJS(data: any): NewUserInChannelDto {
    data = typeof data === 'object' ? data : {};
    const result = new NewUserInChannelDto();
    result.init(data);
    return result;
  }
}
