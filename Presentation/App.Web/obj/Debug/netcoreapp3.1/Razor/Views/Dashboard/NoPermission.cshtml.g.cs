#pragma checksum "C:\Users\Drewsn32\Desktop\NCSolFairFair\Presentation\App.Web\Views\Dashboard\NoPermission.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "58a2c6f5e18ea7bf48714963045cb5bae9eed46c"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Dashboard_NoPermission), @"mvc.1.0.view", @"/Views/Dashboard/NoPermission.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\Drewsn32\Desktop\NCSolFairFair\Presentation\App.Web\Views\_ViewImports.cshtml"
using App.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\Drewsn32\Desktop\NCSolFairFair\Presentation\App.Web\Views\_ViewImports.cshtml"
using App.Helpers;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\Drewsn32\Desktop\NCSolFairFair\Presentation\App.Web\Views\_ViewImports.cshtml"
using App.Web.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "C:\Users\Drewsn32\Desktop\NCSolFairFair\Presentation\App.Web\Views\_ViewImports.cshtml"
using App.BusinessEntities.Requests.Identities;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "C:\Users\Drewsn32\Desktop\NCSolFairFair\Presentation\App.Web\Views\_ViewImports.cshtml"
using App.BusinessEntities.Requests;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "C:\Users\Drewsn32\Desktop\NCSolFairFair\Presentation\App.Web\Views\_ViewImports.cshtml"
using App.BusinessEntities.Enums;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "C:\Users\Drewsn32\Desktop\NCSolFairFair\Presentation\App.Web\Views\_ViewImports.cshtml"
using App.BusinessEntities.Responses;

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "C:\Users\Drewsn32\Desktop\NCSolFairFair\Presentation\App.Web\Views\_ViewImports.cshtml"
using System.Security.Claims;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"58a2c6f5e18ea7bf48714963045cb5bae9eed46c", @"/Views/Dashboard/NoPermission.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c546c09075c95f7f283eeeaf9f8b877432f772cf", @"/Views/_ViewImports.cshtml")]
    public class Views_Dashboard_NoPermission : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 2 "C:\Users\Drewsn32\Desktop\NCSolFairFair\Presentation\App.Web\Views\Dashboard\NoPermission.cshtml"
  
    ViewData["Title"] = "NoPermission";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
#nullable disable
            WriteLiteral("<div class=\"alert alert-danger\">\r\n    <strong>Access denied!!!</strong> You do not have permission.\r\n</div>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
