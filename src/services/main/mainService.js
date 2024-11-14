const { DatabaseError } = require('pg');
const mainRepository = require('../../repositorys/main/mainRepository');
const errorHandler = require('../../errors/errors');

class MainService {
    async listTasksAndReminders(user_id) {
        try {
            const [taskList, reminderList] = await Promise.all([mainRepository.listUserTasks(user_id), mainRepository.listUserReminders(user_id)]);
            return { tasks: taskList, reminders: reminderList };
        } catch (error) {
            console.log(error)
            if (error instanceof DatabaseError) throw new errorHandler.dbError("Erro na conexão com o banco de dados.");
        }
    }
}

module.exports = new MainService();