
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sabio.Data;
using Sabio.Services;
using Sabio.Web.Api.Controllers;
using Sabio.Services.FAQs;
using Sabio.Services.GoogleAnalytics;
using Sabio.Services.Interfaces;
using Sabio.Services.Listings;
using Sabio.Services.Stripe;
using Sabio.Services.UserProfiles;
using Sabio.Web.Api.StartUp.DependencyInjection;
using Sabio.Web.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using Sabio.Models;
using Sabio.Services.Comments;
using Sabio.Models.Interfaces;
using Sabio.Services.Events;
using Sabio.Services.Friends;
using Sabio.Services.Messages;



namespace Sabio.Web.StartUp
{
    public class DependencyInjection
    {
        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            if (configuration is IConfigurationRoot)
            {
                services.AddSingleton<IConfigurationRoot>(configuration as IConfigurationRoot);   // IConfigurationRoot
            }

            services.AddSingleton<IConfiguration>(configuration);   // IConfiguration explicitly

            string connString = configuration.GetConnectionString("Default");
            // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-2.2 
            // The are a number of differe Add* methods you can use. Please verify which one you
            // should be using services.AddScoped<IMyDependency, MyDependency>();

            // services.AddTransient<IOperationTransient, Operation>();

            // services.AddScoped<IOperationScoped, Operation>();

            // services.AddSingleton<IOperationSingleton, Operation>();
          
            services.AddSingleton<Sabio.Data.Providers.IDataProvider, SqlDataProvider>(delegate (IServiceProvider provider)
            {
                return new SqlDataProvider(connString);
            }
            );
            services.AddSingleton<IAccountService, AccountService>();

            services.AddSingleton<IAmenityService, AmenityService>();

            services.AddSingleton<IAuthenticationService<int>, WebAuthenticationService>();

            services.AddSingleton<IAvailableServiceService, AvailableServiceService>();

            services.AddSingleton<IBlogsService, BlogsService>();

            services.AddSingleton<ICheckoutService, CheckoutService>();

            services.AddSingleton<ICommentService, CommentService>();

            services.AddSingleton<ICustomerService, CustomerService>();
       
            services.AddSingleton<IEmailService, EmailService>();

            services.AddSingleton<IEventInfoService, EventInfoService>();

            services.AddSingleton<IEventService, EventService>();

            services.AddSingleton<IExternalLinksService, ExternalLinksService>();

            services.AddSingleton<IFAQService, FAQService>();

            services.AddSingleton<IFileService, FileService>();

            services.AddSingleton<IFriendsServices, FriendsServices>();

            services.AddSingleton<IGoogleAnalyticsService, GoogleAnalyticsService>();

            services.AddSingleton<IGroupService, GroupService>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddSingleton<IIdentityProvider<int>, WebAuthenticationService>();

            services.AddSingleton<IListingAmenityService, ListingAmenityService>();

            services.AddSingleton<IListingAvailabilityService, ListingAvailabilityService>();

            services.AddSingleton<IListingAvailabilityExceptionsService, ListingAvailabilityExceptionsService>();

            services.AddSingleton<IListingImagesService, ListingImagesService>();

            services.AddSingleton<IListingReservationService, ListingReservationService>();

            services.AddSingleton<IListingService, ListingService>();

            services.AddSingleton<IListingVerificationService, ListingVerificationService>();

            services.AddSingleton<ILocationService, LocationService>();

            services.AddSingleton<ILocationVerificationService, LocationVerificationService>();

            services.AddSingleton<ILookUpService, LookUpService>();

            services.AddSingleton<INewsLetterService, NewsLetterService>();

            services.AddSingleton<INewsLetterService, NewsLetterService>();

            services.AddSingleton<INewsletterSubscriptionService, NewsletterSubscriptionService>();

            services.AddSingleton<IProductsService, ProductsService>();

            services.AddSingleton<IRatingService, RatingService>();

            services.AddSingleton<IShareStoryService, ShareStoryService>();

            services.AddSingleton<ISwapperStoryService, SwapperStoriesService>();

            services.AddSingleton<IUserProfilesServices, UserProfilesServices>();

            services.AddSingleton<IUserRolesService, UserRolesService>();

            services.AddSingleton<IUserService, UserService>();

            services.AddSingleton<IVenueService, VenueService>();



            GetAllEntities().ForEach(tt =>
            {
                IConfigureDependencyInjection idi = Activator.CreateInstance(tt) as IConfigureDependencyInjection;

                //This will not error by way of being null. BUT if the code within the method does
                // then we would rather have the error loadly on startup then worry about debuging the issues as it runs
                idi.ConfigureServices(services, configuration);
            });
        }

        public static List<Type> GetAllEntities()
        {
            return AppDomain.CurrentDomain.GetAssemblies().SelectMany(x => x.GetTypes())
                 .Where(x => typeof(IConfigureDependencyInjection).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
                 .ToList();
        }

        public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
        }
    }
}

