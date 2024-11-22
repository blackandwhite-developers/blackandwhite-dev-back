import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service.type';

export default class UsersController {
  constructor(private _userService: UserService) {
    this.signUp = this.signUp.bind(this);
    this.getMyInfo = this.getMyInfo.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.findId = this.findId.bind(this);
    this.authPassword = this.authPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.grantRole = this.grantRole.bind(this);
  }
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this._userService.createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profile: {
          phone: req.body.profile.phone,
          birth: req.body.profile.birth,
          gender: req.body.profile.gender,
          interest: req.body.profile.interest,
          nickname: req.body.profile.nickname,
          profileImage: req.body.profile.profileImage,
        },
        terms: {
          termsOfService: Boolean(req.body.terms.termsOfService),
          privacyPolicy: Boolean(req.body.terms.privacyPolicy),
          locationBasedService: Boolean(req.body.terms.locationBasedService),
          marketingInfoAgree: Boolean(req.body.terms.marketingInfoAgree),
        },
        accountType: 'local',
      });
      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  async getMyInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this._userService.getUserDetail(req.user.userId);

      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      await this._userService.updateUser(userId, {
        ...req.body,
        profile: {
          ...req.body.profile,
        },
      });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const deleteUser = await this._userService.deleteUser(userId);
      res.send(deleteUser);
    } catch (error) {
      next(error);
    }
  }

  async findId(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, phone } = req.body;
      const userId = await this._userService.getEmailByNameAndPhone(name, phone);
      res.send(userId);
    } catch (error) {
      next(error);
    }
  }
  async authPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body;
      await this._userService.authNameAndEmail(name, email);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { newPassword } = req.body;
      const { name, email } = req.params;
      await this._userService.resetPassword(name, email, newPassword);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async grantRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, role } = req.body;
      await this._userService.grantRole(userId, role);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
