import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service.type';

export default class UsersController {

  constructor(private _userService: UserService) {
    this.signUp = this.signUp.bind(this);
    this.getMyInfo = this.getMyInfo.bind;
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this._userService.createUser({
        email: req.body.email,
        password: req.body.password,
        profile: {
          name: req.body.profile.name,
          phone: req.body.profile.phone,
          birth: req.body.profile.birth,
          gender: req.body.profile.gender,
          address: req.body.profile.address,
          addressDetail: req.body.profile.addressDetail,
          intereste: req.body.profile.intereste,
          nickname: req.body.profile.nickname,
        },
      });
      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  async getMyInfo(req: Request, res: Response, next: NextFunction) {
    const user = await this._userService.getUserDetail(req.user.userId);

    res.send(user);
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;

      const user = await this._userService.updateUser(userId, {
        profile: {
          ...req.body.profile,
        },
      });

      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  async updateMyInfo(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }

  async deactivateMyInfo(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(req.body);
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
}
