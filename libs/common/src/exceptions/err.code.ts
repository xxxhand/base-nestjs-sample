import { CustomDefinition } from '@xxxhand/app-common';
import { errConstants } from './err.const';

export const errCodes: CustomDefinition.ICodeStruct[] = [
  {
    codeName: errConstants.ERR_ACCOUNT_NOT_FOUND,
    code: 10001,
    httpStatus: 404,
    message: 'Account not found',
  },
];
