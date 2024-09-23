"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperFacturaAPI = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var fs = __importStar(require("fs"));
var pako_1 = __importDefault(require("pako"));
var SuperFacturaAPI = /** @class */ (function () {
    function SuperFacturaAPI(user, password) {
        this.serverUrl = "https://superfactura.cl/";
        this.version = "0.1-nodejs";
        this.user = user;
        this.password = password;
    }
    SuperFacturaAPI.prototype.SendDTE = function (data_1, ambiente_1) {
        return __awaiter(this, arguments, void 0, function (data, ambiente, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            options["ambiente"] = ambiente;
                            // options["encoding"] = "UTF-8";
                            options["version"] = this.version;
                            if (options["url"]) {
                                this.serverUrl = options["url"];
                            }
                            if (options["savePDF"]) {
                                options["getPDF"] = 1;
                            }
                            if (options["saveXML"]) {
                                options["getXML"] = 1;
                            }
                            if (options["saveEscpos"]) {
                                // Add compatibility with standard syntax "save... (like savePDF or saveXML)"
                                options["getEscPos"] = options["saveEscpos"];
                            }
                            this.SendRequest(data, options)
                                .then(function (output) {
                                var obj = JSON.parse(output);
                                if (obj["ack"] !== "ok") {
                                    var text = obj["response"]["title"] + " - " + obj["response"]["message"];
                                    return reject(text);
                                }
                                var appRes = obj["response"];
                                var folio = appRes["folio"];
                                if (appRes["ok"] === "1") {
                                    var savePDF = options["savePDF"];
                                    if (savePDF) {
                                        _this.WriteFile("".concat(savePDF, ".pdf"), _this.DecodeBase64(appRes["pdf"]));
                                        if (appRes["pdfCedible"]) {
                                            _this.WriteFile("".concat(savePDF, "-cedible.pdf"), _this.DecodeBase64(appRes["pdfCedible"]));
                                        }
                                    }
                                    var saveXML = options["saveXML"];
                                    if (saveXML) {
                                        _this.WriteFile("".concat(saveXML, ".xml"), appRes["xml"].encode("latin-1"));
                                    }
                                    var saveEscpos = options["getEscPos"];
                                    if (saveEscpos) {
                                        var b64escpos = appRes["escpos"];
                                        _this.WriteFile("".concat(saveEscpos, ".pos"), _this.DecodeBase64(b64escpos));
                                    }
                                }
                                else {
                                    return reject(output);
                                }
                                resolve(obj);
                            })
                                .catch(function (error) {
                                return reject(error);
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    SuperFacturaAPI.prototype.SendRequest = function (data, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params, searchParams, headers, response, blob, arrayBuffer, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            user: this.user,
                            pass: this.password,
                            content: JSON.stringify(data),
                            options: JSON.stringify(options),
                        };
                        searchParams = new URLSearchParams(params);
                        headers = {
                            "Content-type": "application/x-www-form-urlencoded",
                            Accept: "text/plain",
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, (0, node_fetch_1.default)("".concat(this.serverUrl, "?a=json"), {
                                method: "POST",
                                headers: headers,
                                body: searchParams.toString(),
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response) return [3 /*break*/, 5];
                        return [4 /*yield*/, response.blob()];
                    case 3:
                        blob = _a.sent();
                        return [4 /*yield*/, blob.arrayBuffer()];
                    case 4:
                        arrayBuffer = _a.sent();
                        return [2 /*return*/, this.Decompress(arrayBuffer)];
                    case 5:
                        console.error("Fetch failed");
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_1 = _a.sent();
                        throw err_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SuperFacturaAPI.prototype.Decompress = function (gzip) {
        return pako_1.default.ungzip(gzip, { to: "string" });
    };
    SuperFacturaAPI.prototype.DecodeBase64 = function (b64) {
        return Buffer.from(b64, "base64");
    };
    SuperFacturaAPI.prototype.WriteFile = function (filename, data) {
        try {
            fs.writeFileSync(filename, data);
        }
        catch (err) {
            throw err;
        }
    };
    return SuperFacturaAPI;
}());
exports.SuperFacturaAPI = SuperFacturaAPI;
