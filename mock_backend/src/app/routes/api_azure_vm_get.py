from flask import Blueprint
from flask import jsonify
import app.services.file_reader as file_reader

api_azure_vm_get = Blueprint("api_azure_vm_get",  __name__)

@api_azure_vm_get.route("/api/azure/vm/get", methods=["GET"])
def api_azure_vm_get_all():
    json_data = file_reader.get_json_from_file("./app/static/getAllVm.json")
    return jsonify(json_data)

@api_azure_vm_get.route("/api/azure/vm/get/<rg_name>", methods=["GET"])
def api_azure_vm_get_single(rg_name):
    app.logger.info(f"get parameter rg_name: {rg_name}")
    json_data = file_reader.get_json_from_file("./app/static/getVmWithRgName.json")
    return jsonify(json_data)

@api_azure_vm_get.route("/api/azure/vm/table/getcolumn")
def azure_vm_table_get_columns():
    json_data = file_reader.get_json_from_file("./app/static/azure_vm_table_getcolumn.json")
    return jsonify(json_data)