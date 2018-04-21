sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		sendMail: function(oData){
			emailjs.send("gmail", "template_LXxnwTHG", {
				"to_email": oData.toMail,
				"to_name": oData.toName,
				"from_name": "Miri (Eden)",
				"message_html": oData.msg
			}).then(oData.fnCallback, function(err) {
				mainController.getView().setBusy(false);
				sap.m.MessageToast.show('Error');
			});
		}

	};
});