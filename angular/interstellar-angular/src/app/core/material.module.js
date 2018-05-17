"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
// NoConflictStyleCompatibilityMode, MaterialModule
var material_1 = require("@angular/material");
var materialModules = [
    material_1.MatButtonModule,
    material_1.MatTabsModule,
    material_1.MatMenuModule,
    material_1.MatCardModule,
    material_1.MatInputModule,
    material_1.MatGridListModule,
    material_1.MatTableModule,
    material_1.MatSidenavModule,
    material_1.MatSelectModule,
    material_1.MatDialogModule,
    material_1.MatToolbarModule,
    material_1.MatStepperModule,
    material_1.MatCheckboxModule,
    material_1.MatListModule,
    material_1.MatSliderModule,
    material_1.MatIconModule,
    material_1.MatProgressSpinnerModule
];
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        core_1.NgModule({
            imports: materialModules.slice(),
            exports: materialModules.slice()
        })
    ], MaterialModule);
    return MaterialModule;
}());
exports.MaterialModule = MaterialModule;
