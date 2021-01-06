sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageBox"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, ODataModel) {
        "use strict";

        return Controller.extend("com.wise.HTML5Module.controller.Login", {
            onInit: function () {

            },

            onPress: function () {

                var user = this.getView().byId("myUser").getValue();
                var pass = this.getView().byId("myPassword").getValue();
                var langu = this.getView().byId("idComboLangu").getSelectedKey();
                //new sap.m.MessageBox.information(user + " " + pass + " " + langu);

                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/wi20/GWLOGIN_SRV/");
                oModel.metadataLoaded(true).then(
                    function (onSuccess) {
                        console.log("MetadataLoaded success");
                        oModel.read("/HeadToLoginSet", {
                            method: "GET",
                            urlParameters: {
                                User:"2000000000",
                                Pwd:"1234567890",
                                Language:"ES"
                            },
                            expand: "HeadToReturnNav",
                            success: function (oData, response) {
                                MessageBox.information("Success");
                                console.log(onSuccess);
                            },
                            error: function (oError) {
                                console.log(oError);
                            }
                        });

                    },
                    function (onError) {
                        console.log("Failed to load metadata");
                        MessageBox.error("Error");
                    }
                )

            }
        });
    });
