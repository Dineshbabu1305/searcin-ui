
export class AdminController {
	constructor($scope, $rootScope, $state, $stateParams, $location, $translate, AdminConstants, DataServices, $q) {
		'ngInject';
		let vm = this;
		vm.DI = () => ({ $scope, $rootScope, $state, $stateParams, $location, $translate, AdminConstants, DataServices, $q });
		$scope.$emit("initAdminService");
		vm.menu = AdminConstants.menu;
		vm.active = $stateParams.page;
		vm.url = "pages/admin/html/" + $stateParams.page + ".html";
		vm.data = {};
	}

	saveCategory() {
		let vm = this;
		let { DataServices } = vm.DI();
		let saveCategory = DataServices.saveCategory({ name: vm.data.name });
		saveCategory.then(function () {
			alert("Success");
			vm.data.name = "";
		});
	}

	getCategories() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.getCategories().then(function (response) {
				vm.data.categories = response.data;
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	deleteCategory() {
		let vm = this;
		let { DataServices } = vm.DI();
		let updateCategory = DataServices.deleteCategory(vm.data.category.id);
		updateCategory.then(function () {
			vm.data.category = null;
			vm.getCategories();
			alert("deleted successfully");
		});
	}


	//sub categories

	saveSubCategory() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.saveSubCategory({ name: vm.data.name, category_id: vm.data.categoryId }).then(function (response) {
				vm.data.name = "";
				alert("added successfully");
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	deleteSubCategory() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.deleteSubCategory(vm.data.subcategory.id).then(function (response) {
				vm.data.subcategory = "";
				alert("deleted successfully");
				vm.getSubCategories();
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	getSubCategories() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.getSubCategories(vm.data.categoryId).then(function (response) {
				vm.data.subcategories = response.data;
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	//services

	getServices() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.getServices().then(function (response) {
				vm.data.services = response.data;
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	addService() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.addService({ name: vm.data.name, description: vm.data.description }).then(function (response) {
				vm.data = {};
				resolve(response);
				alert("added success fully");
			}, function (error) {
				reject(error);
			});
		});
	}

	updateService() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.updateService({ id: vm.data.service.id, name: vm.data.service.name, description: vm.data.service.description }).then(function (response) {
				vm.data.service = {};
				alert("updated successfully");
				vm.getServices();
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	deleteService() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.deleteService(vm.data.service.id).then(function (response) {
				vm.data.service = {};
				alert("deleted successfully");
				vm.getServices();
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	getAreas() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.getAreas().then(function (response) {
				vm.data.areas = response.data;
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	addArea() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.addArea({ name: vm.data.name }).then(function (response) {
				vm.data = {};
				alert("added area");
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	updateArea() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.updateArea({ id: vm.data.area.id, name: vm.data.area.name }).then(function (response) {
				vm.data.area = {};
				alert("updated successfully");
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	deleteArea() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.deleteArea(vm.data.area.id).then(function (response) {
				vm.data.area = {};
				alert("deleted successfully");
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}


	getVendors() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.getVendors().then(function (response) {
				vm.data.vendors = response.data;
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	getVendorsList() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.vendorsList().then(function (response) {
				vm.data.vendors = response.data;
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	getByVendorId() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.vendorById(vm.data.selected.id).then(function (response) {
				vm.data.vendor = response.data.vendor;
				vm.data.categoryId = response.data.vendor.category_id;
				vm.data.address = response.data.address;
				vm.data.contact = response.data.contact;
				let services = [];
				angular.forEach(response.data.services, function(item, $index) {
					services.push(item.id);
				});
				angular.forEach(vm.data.services, function(item, $index) {
					if(services.indexOf(item.id) !== -1)
						item.selected = true;
					else
						item.selected = false;
				});
				vm.getSubCategories();
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	addVendor() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.addVendor(vm.data.vendor).then(function (response) {
				alert("Successfully Added!");
				vm.data = {};
				vm.getCategories();
				resolve(response);
			}, function (error) {
				alert(error.data.message);
				reject(error);
			});
		});
	}

	updateVendor() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		let selectedServices = [];
		angular.forEach(vm.data.services, function (item, $index) {
			if (item.selected) {
				selectedServices.push(item.id);
			}
		});
		return $q(function (resolve, reject) {
			DataServices.updateVendor(vm.data.vendor).then(function (response) {
				alert("Updated successfully!");
				vm.data = {};
				vm.getVendorsList();
				vm.getCategories();
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	deleteVendor() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.deleteVendor(vm.data.selected.id).then(function (response) {
				vm.data = {};
				vm.getVendorsList();
				vm.getCategories();
				alert("successfully deleted");
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	getAddressByVendorId() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		let vendor_id = vm.address.vendor_id;
		return $q(function (resolve, reject) {
			DataServices.findAddressByVendor(vendor_id).then(function (response) {
				if(response.data === "") {
					vm.address = {vendor_id:vendor_id};
				}
				else {
					vm.address = response.data;
				}
				resolve(response);
			}, function (error) {
				reject(error);
			});
		});
	}

	addAddress() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		console.log(vm.address);
		return $q(function (resolve, reject) {
			DataServices.addAddress(vm.address).then(function (response) {
				vm.address = {};
				alert("Successfully added");
				resolve(response);
			}, function (error) {
				alert(error.data.message);
				reject(error);
			});
		});
	}

	getContactByVendorId() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		let vendor_id = vm.contact.vendor_id;
		return $q(function (resolve, reject) {
			DataServices.findContactByVendor(vendor_id).then(function (response) {
				if(response.data === "") {
					vm.contact = {vendor_id:vendor_id};
				}
				else {
					vm.contact = response.data;
				}
				resolve(response);
			}, function (error) {
				alert(error.data.message);
				reject(error);
			});
		});
	}

	addContact() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.addContact(vm.contact).then(function (response) {
				vm.contact = {};
				alert("Successfully added");
				resolve(response);
			}, function (error) {
				alert(error.data.message);
				reject(error);
			});
		});
	}

	getServiceByVendorId() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		return $q(function (resolve, reject) {
			DataServices.findServicesByVendor(vm.vendor_id).then(function (response) {
				angular.forEach(vm.data.services, function(item, $index) {
					if(response.data.indexOf(item.id) != -1)
						item.selected = true;
				});
				resolve(response);
			}, function (error) {
				alert(error.data.message);
				reject(error);
			});
		});
	}

	addVendorServices() {
		let vm = this;
		let { DataServices, $q } = vm.DI();
		let services = [];
		angular.forEach(vm.data.services, function(item, $index) {
			if(item.selected)
				services.push(item.id);
		});
		return $q(function (resolve, reject) {
			DataServices.addVendorServices({vendor_id:vm.vendor_id, services:services}).then(function (response) {
				vm.vendor_id = null;
				vm.data = {};
				vm.getVendorsList();
				vm.getServices();
				alert("Successfully added");
				resolve(response);
			}, function (error) {
				alert(error.data.message);
				reject(error);
			});
		});
	}
}