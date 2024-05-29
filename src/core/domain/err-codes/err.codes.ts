import { CustomDefinition } from '@xxxhand/app-common';
import { errConstants } from './err.const';

export const errCodes: CustomDefinition.ICodeStruct[] = [
  {
    codeName: errConstants.ERR_CLIENT_NAME_EMPTY,
    code: 10001,
    httpStatus: 400,
    message: 'Client name is empty',
  },
  {
    codeName: errConstants.ERR_CLIENT_CALLBACK_URL_EMPTY,
    code: 10002,
    httpStatus: 400,
    message: 'Client callback url is empty',
  },
];
