import React from 'react'
import { ChevronDown, Plus, X } from 'lucide-react'

export default function LenderApp() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navigation */}


      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-blue-400 mb-8 text-center">
            Track Your Lent or Borrowed Items
          </h1>

          <form className="space-y-6">
            <div>
              <label htmlFor="transaction-type" className="block text-sm font-medium text-gray-300">
                Are you borrowing or lending?
              </label>
              <select
                id="transaction-type"
                name="transaction-type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-900 border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Borrowing</option>
                <option>Lending</option>
              </select>
            </div>

            <div>
              <label htmlFor="item-type" className="block text-sm font-medium text-gray-300">
                Is this an item or money?
              </label>
              <select
                id="item-type"
                name="item-type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-900 border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Item</option>
                <option>Money</option>
              </select>
            </div>

            <div>
              <label htmlFor="item-name" className="block text-sm font-medium text-gray-300">
                Item Name
              </label>
              <input
                type="text"
                name="item-name"
                id="item-name"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm bg-gray-900 border-gray-700 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="user" className="block text-sm font-medium text-gray-300">
                Select a user
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <select
                  id="user"
                  name="user"
                  className="flex-1 focus:ring-blue-500 focus:border-blue-500 block w-full min-w-0 rounded-l-md sm:text-sm bg-gray-900 border-gray-700"
                >
                  <option>John Doe (john@example.com)</option>
                  <option>Jane Smith (jane@example.com)</option>
                </select>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-700 rounded-r-md bg-gray-800 text-gray-400 text-sm hover:bg-gray-700 transition-colors duration-300"
                >
                  <Plus className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Add New User</span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="return-date" className="block text-sm font-medium text-gray-300">
                Return Date
              </label>
              <input
                type="date"
                name="return-date"
                id="return-date"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm bg-gray-900 border-gray-700 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                Optional Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm bg-gray-900 border-gray-700 rounded-md"
              ></textarea>
            </div>

            <fieldset>
              <legend className="text-sm font-medium text-gray-300">Contact Method</legend>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="email"
                    name="contact-method"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 bg-gray-900 border-gray-700 rounded"
                  />
                  <label htmlFor="email" className="ml-2 text-sm text-gray-300">
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="sms"
                    name="contact-method"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 bg-gray-900 border-gray-700 rounded"
                  />
                  <label htmlFor="sms" className="ml-2 text-sm text-gray-300">
                    SMS
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="whatsapp"
                    name="contact-method"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 bg-gray-900 border-gray-700 rounded"
                  />
                  <label htmlFor="whatsapp" className="ml-2 text-sm text-gray-300">
                    WhatsApp
                  </label>
                </div>
              </div>
            </fieldset>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-400 hover:text-blue-400 transition-colors duration-300">
                About
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Contact
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Privacy Policy
              </a>
            </div>
          </nav>
        </div>
      </footer>
    </div>
  )
}

