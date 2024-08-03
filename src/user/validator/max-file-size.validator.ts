import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class MaxFileSizeConstraint implements ValidatorConstraintInterface {
  validate(profilePic: string, args: any) {
    if (!profilePic) return true; // If profilePic is not provided, it's valid since it's optional

    const MAX_SIZE = 1024 * 1024 * 3; // 2MB size limit

    // Assuming the profilePic is a base64 string
    const buffer = Buffer.from(profilePic, 'base64');
    return buffer.length <= MAX_SIZE;
  }

  defaultMessage(args: any) {
    return 'Profile picture size must be 2MB or less';
  }
}

export function MaxFileSize(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: MaxFileSizeConstraint,
    });
  };
}
