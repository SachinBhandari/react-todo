/**
 * Example Controller
 */

class ExampleController {
  static async getUser() {
    const mockDB = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Nipper The Dog',
          occupation: 'City Ornament',
          location: 'Albany, NY',
          zip: 12182
        });
      }, 5000);
    });

    const user = await mockDB;

    return user;
  }
}

module.exports = ExampleController;
