import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function CompanyInformation() {
  const [formData, setFormData] = useState({
    companyName: 'Acme Corporation',
    legalName: 'Acme Corporation LLC',
    ein: '12-3456789',
    entityType: '',
    fiscalYearEnd: '12/31',
    stateOfFormation: 'Delaware',
    filingJurisdictions: 'Federal, California, Delaware, New York, Texas, Nevada',
    address: '123 Business Street',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex-1 overflow-auto bg-[#121212]">
      <div className="p-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">Company Information</h1>
          <p className="text-gray-400">Update your company details and contact information</p>
        </div>

        <div className="bg-white rounded-lg p-6">
          <div className="mb-8">
            <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg mb-6">
              <AlertCircle size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-orange-800">
                Changes to EIN, Legal Name, or Entity Type may require tax re-review by your preparer
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#b89968]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Legal Name</label>
                <input
                  type="text"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#b89968]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">EIN</label>
                <input
                  type="text"
                  name="ein"
                  value={formData.ein}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#b89968]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Entity Type</label>
                <input
                  type="text"
                  name="entityType"
                  value={formData.entityType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#b89968]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fiscal Year End</label>
                <input
                  type="text"
                  name="fiscalYearEnd"
                  value={formData.fiscalYearEnd}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#b89968]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State of Formation</label>
                <input
                  type="text"
                  name="stateOfFormation"
                  value={formData.stateOfFormation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#b89968]"
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Filing Jurisdictions</h3>
              <p className="text-sm text-gray-600 mb-3">States where your entity files tax returns</p>
              <input
                type="text"
                name="filingJurisdictions"
                value={formData.filingJurisdictions}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#b89968]"
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#b89968]"
                />
              </div>
            </div>
          </div>
        </div>

        <button className="mt-8 px-6 py-2 bg-[#b89968] hover:bg-[#a68959] text-white font-medium rounded-lg transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
