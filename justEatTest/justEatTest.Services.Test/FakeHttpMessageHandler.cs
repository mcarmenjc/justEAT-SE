using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace JustEatTest.Services.Test
{
	public class FakeHttpMessageHandler: HttpMessageHandler
	{
		public virtual HttpResponseMessage Send(HttpRequestMessage request)
		{
			throw new NotImplementedException();
		}

		protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, System.Threading.CancellationToken cancellationToken)
		{
			return Task.FromResult(Send(request));
		}
	}
}

