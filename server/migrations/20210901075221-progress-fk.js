'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('progresses', {
       fields : ['userId'],
       type: 'foreign key',
       name: 'FK_pro_user_id', // 여기서 포린키가 연결됨.
       references: {
         table: 'users',
         field: 'id'
       },
       onDelete: 'cascade',
       onUpdate: 'cascade'
     });

     await queryInterface.addConstraint('progresses', {
      fields : ['challengeId'],
      type: 'foreign key',
      name: 'FK_pro_challenge_id', // 여기서 포린키가 연결됨.
      references: {
        table: 'challenges',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeConstraint('progresses', 'FK_pro_user_id');

     await queryInterface.removeConstraint('progresses', 'FK_pro_challenge_id');

  }
};
