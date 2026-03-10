<div id="renameModal"
class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center hidden">

<form id="renameForm"
method="POST"
class="bg-white p-6 rounded-xl shadow-xl w-80 flex flex-col space-y-4 border border-gray-100">

<h3 class="text-xl font-semibold text-gray-800">Rename File</h3>

<input
type="text"
id="renameInput"
name="name"
required
class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">

<div class="flex justify-end space-x-2">

<button type="submit"
class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
Save
</button>

<button type="button"
id="renameCancel"
class="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
Cancel
</button>

</div>

</form>

</div>