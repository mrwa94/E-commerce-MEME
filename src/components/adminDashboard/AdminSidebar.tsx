import { Link } from 'react-router-dom'
import { FaUsers } from 'react-icons/fa'
import { MdRequestPage } from 'react-icons/md'
import { BiSolidCategoryAlt } from 'react-icons/bi'
import { ShoppingBagIcon, UserCircleIcon, PowerIcon } from '@heroicons/react/24/solid'

export function AdminSidebar() {
  const titleItem = [
    {
      title: 'Profile',
      path: '/profile/adminProfile',
      icon: <UserCircleIcon />
    },
    {
      title: 'Products',
      path: '/profile/NewProducts',
      icon: <ShoppingBagIcon />
    },
    {
      title: 'Categories',
      path: '/profile/ListCatergories',
      icon: <BiSolidCategoryAlt />
    },
    {
      title: 'Users',
      path: '/profile/ListUsers',
      icon: <FaUsers />
    },
    {
      title: 'Orders',
      path: '/profile/ListOrder',
      icon: <MdRequestPage />
    },
    {
      title: 'Log Out',
      path: '/profile/AdminLogout',
      icon: <PowerIcon />
    }
  ]
  return (
    <aside className="flex flex-row  gap-44">
      <div className="flex flex-col  h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4">
        <ul className="container   shadow-lg rounded-lg">
          {titleItem.map((item, index) => {
            return (
              <li className="" key={index}>
                <Link
                  className="flex flex-row gap-3 m-5  p-5 :shadow-inner text-2xl"
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
