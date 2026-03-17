export default function LegalSettings() {
  const documents = [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: 'Learn how we collect, use, and protect your personal information',
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      description: 'Read the terms and conditions for using Sovereign Tax UI',
    },
    {
      id: 'eula',
      title: 'End User License Agreement (EULA)',
      description: 'Review the software license agreement for Sovereign Tax UI',
    },
    {
      id: 'dpa',
      title: 'Data Processing Agreement (DPA)',
      description: 'Understand how we process and safeguard your tax data',
    },
    {
      id: 'cookies',
      title: 'Cookie Policy',
      description: 'Learn about our use of cookies and tracking technologies',
    },
    {
      id: 'aup',
      title: 'Acceptable Use Policy',
      description: 'Guidelines for appropriate use of Sovereign Tax UI services',
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-[#121212]">
      <div className="p-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">Legal Information</h1>
          <p className="text-gray-400">Access legal documents and agreements</p>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Documents</h3>
          <p className="text-gray-600 text-sm mb-6">
            Review our legal documents and agreements that govern your use of Sovereign Tax UI.
          </p>

          <div className="space-y-3">
            {documents.map(doc => (
              <div
                key={doc.id}
                className="flex items-center justify-between py-4 px-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{doc.title}</h4>
                  <p className="text-sm text-gray-600">{doc.description}</p>
                </div>
                <button className="px-4 py-2 bg-[#b89968] hover:bg-[#a68959] text-white font-medium rounded-lg transition-colors flex-shrink-0">
                  View Document
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
