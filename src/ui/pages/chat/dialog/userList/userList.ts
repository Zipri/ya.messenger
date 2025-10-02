import './userList.scss';
import userListTemplate from './userList.hbs?raw';
import { Block, type TBlockProps } from '@controllers';
import { UserItem } from './userItem';
import { mockUsers } from './mock';

interface UserListProps {
  chatId?: string;
}

export class UserList extends Block<UserListProps & TBlockProps> {
  constructor(props: UserListProps) {
    super({
      ...props,
      users: [],
    });
  }

  render(): string {
    return userListTemplate;
  }

  componentDidMount(): void {
    this._loadUsers();
  }

  private _loadUsers() {
    // TODO: Replace with API call
    const users = mockUsers;
    this.setProps({ userCount: users.length });

    this.lists.users = users.map(
      (user) =>
        new UserItem({
          user,
          onDelete: (userId) => {
            console.log(`Delete user ${userId} from chat ${this.props.chatId}`);
            // TODO: Call store method to delete user
          },
        })
    );
  }
}
