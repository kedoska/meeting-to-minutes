import { Fragment, useState } from 'react';
import ph1 from '../assets/ph1.png';
import { Minutes } from '@core/domain';
import Modal from './modal';

export default function Landing() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Minutes>();

  const classNames = (...classes: string[]): string =>
    classes.map((x) => x).join(' ');

  const handleUploadVideo = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = async (event) => {
      if (!event.target) {
        return;
      }

      const file = (event.target as HTMLInputElement).files?.[0];

      if (!file) {
        return;
      }

      setLoading(true);
      setData(undefined);

      const apiEndpoint = '/api/v1/videos';
      const formData = new FormData();
      formData.append('video', file);
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
      });

      const data = (await response.json()) as Minutes;
      setData(data);

      setLoading(false);
    };
    input.click();
  };

  return (
    <Fragment>
      {data && (
        <Modal text={data?.content} onClose={() => setData(undefined)} />
      )}
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <div className="hidden sm:mt-32 sm:flex lg:mt-16">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Made with coffee and love in Barcelona
                </div>
              </div>
              <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                Instant Meeting Minutes with AI
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Upload your <b>Microsoft Teams</b> video recordings and let our
                AI do the rest. We extract the audio, transcribe the
                conversation, and analyze the text to generate comprehensive
                meeting minutes. Try it now!
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <button
                  disabled={loading}
                  onClick={handleUploadVideo}
                  className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 disabled:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
                >
                  <svg
                    className={classNames(
                      'animate-spin -ml-1 mr-3 h-5 w-5 text-white',
                      !loading ? 'hidden' : ''
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {loading ? 'Uploading video...' : 'Upload video'}
                </button>
              </div>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <img
              className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
              src={ph1}
              alt=""
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
