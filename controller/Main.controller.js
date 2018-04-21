var mainController;

sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "../model/models"
               ], function(Controller, Model) {
	"use strict";

	return Controller.extend("MiriRegev.controller.Main", {
		onInit: function(){
			mainController = this;
			
			window.addEventListener("resize", mainController.onWindowResize);
		},
		
		onWindowResize: function(){
			if ($('.sapMDialog').get(0) && sap.ui.getCore().byId($('.sapMDialog').get(0).id).isOpen()){
				var height = $('.sapMDialog').height();
				sap.ui.getCore().byId('mirieden').$().height(height);
			}
		},

		onPressImage: function(oEvent) {
			var id = oEvent.getSource().getId(),
			url = '';
			if (id.includes('img_fb')) url = "https://www.facebook.com/miri.regev.il/";
			else if (id.includes('img_ig')) url = "https://www.instagram.com/miri_regev/?hl=en";
			else if (id.includes('img_twitter')) url = "https://twitter.com/regev_miri?lang=en";
			window.open(url, "_blank");
		},

		onSendMail: function(oEvent) {
			var oData = {
					toMail: this.getView().byId('form_mail').getValue(),
					msg: this.getView().byId('form_msg').getValue(),
					toName: this.getView().byId('form_name').getValue(),
					fnCallback: this.onEmailSent
			};

			mainController.getView().setBusy(true);
			Model.sendMail(oData);
		},

		onEmailSent: function(promiseResponse) {
			mainController.getView().byId('form_mail').setValue('');
			mainController.getView().byId('form_msg').setValue('');
			mainController.getView().byId('form_name').setValue('');
			mainController.getView().setBusy(false);
			mainController.onMessageSuccessDialogPress();
		},

		onMessageSuccessDialogPress: function() {
			var dialog = new sap.m.Dialog({
				title: 'Success',
				type: 'Message',
				state: 'Success',
				content: new sap.m.Text({
					text: "Your Email will arrive at the Minister's desk any time!\n\nThank you for contacting Miri!"
				}),
				beginButton: new sap.m.Button({
					text: 'OK',
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		},

		onOpenIG: function(oEvent){
			var oDialog = new sap.m.Dialog({
				showHeader: false,
				content: new sap.m.Image({
					id: 'mirieden',
					src: './img/mypic.jpg'
				}),
				afterClose: function(oEvent){
					window.removeEventListener("resize", mainController.onWindowResize);
					oDialog.destroy();
				},
				afterOpen: mainController.onWindowResize,
				
			}).addStyleClass('myDialog');
			
			
			
			document.addEventListener("click", 
					function closeDialog(oEvent){
						if(oEvent.target.id === "sap-ui-blocklayer-popup"){
							oDialog.close();
							document.removeEventListener("click", closeDialog);
						}
			});
			
			window.addEventListener("resize",mainController.onWindowResize);
			

			oDialog.open();
		}
	});
});