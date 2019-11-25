import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    /**
     * Check if request is from a provider before list day schedule
     */
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true},
    });
    console.log(`${req.userId} ===============================================` );
    if(!checkIsProvider){
      return res
      .status(401)
      .json({error: 'Only providers can load notifications'});

    }

    const notifications = await Notification.find({
      user: req.userId,
    }).sort({createdAt: 'desc'}).limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    /**
     * Atualiza status da notificação
     */
    // const notification = await Notification.findById(req.params.id);

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    return res.json(notification);
  }
}

export default new NotificationController();
