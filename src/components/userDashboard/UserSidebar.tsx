import { Link } from 'react-router-dom'
import { MdRequestPage } from 'react-icons/md'
import { UserCircleIcon, PowerIcon } from '@heroicons/react/24/solid'

export function UserSidebar() {
  const titleItem = [
    {
      title: 'Profile',
      path: '/profile/userprofile',
      icon: <UserCircleIcon />
    },

    {
      title: 'Orders',
      path: '/profile/userOrders',
      icon: <MdRequestPage />
    },
    {
      title: 'Log Out',
      path: '/profile/userLogout',
      icon: <PowerIcon />
    }
  ]
  return (
    <aside className="flex flex-row  lg:gap-44 lg:w-64 sm:w-44">
      <div className="flex flex-col  h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4">
        <ul className="container   shadow-lg rounded-lg">
          {titleItem.map((item, index) => {
            return (
              <li className="" key={index}>
                <Link
                  className="flex flex-row gap-3 lg:m-5  lg:p-5 :shadow-inner lg:text-2xl sm:text-sm sm:p-5"
                  to={item.path}>
                  <div className="w-5 h-5 mt-1">{item.icon}</div>
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
