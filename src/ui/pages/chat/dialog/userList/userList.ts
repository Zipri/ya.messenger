import './userList.scss';
import userListTemplate from './userList.hbs?raw';
import { Block, type TBlockProps } from '@controllers';
import { UserItem } from './userItem';
import { Button } from '@ui-components';

interface UserListProps {}

export class UserList extends Block<UserListProps & TBlockProps> {
  constructor() {
    super({
      users: [],
      addUserBtn: new Button({
        text: 'Добавить пользователя',
        id: 'add-user-btn',
        styleClasses: 'user-list__add-btn',
        onClick: async () => {
          const users = await window.APP.store?.chats.getUsers();
          if (users) {
            const exampleUsers = users
              .map((user) => `(${user.id}) ${user.login}`)
              .join(', ');
            const userId = prompt(
              `Введите ID пользователя, например: ${exampleUsers}`
            );
            if (userId) {
              await window.APP.store?.chats.addChatUser(userId);
              this._loadUsers();
            }
          } else {
            const userId = prompt('Введите ID пользователя');
            if (userId) {
              await window.APP.store?.chats.addChatUser(userId);
              this._loadUsers();
            }
          }
        },
      }),
    });
  }

  render(): string {
    return userListTemplate;
  }

  componentDidMount(): void {
    this._loadUsers();
  }

  private async _loadUsers() {
    if (!window.APP.store) return;

    const users = await window.APP.store.chats.getActiveChatUsers();
    if (!users) return;

    this.setProps({ userCount: users.length });

    this.lists.users = users.map(
      (user) =>
        new UserItem({
          user,
          onDelete: async (userId) => {
            await window.APP.store?.chats.deleteChatUser(userId);
            this._loadUsers();
          },
        })
    );
  }
}
