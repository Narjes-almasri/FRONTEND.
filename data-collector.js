/**
 * Data Collector Utility
 * Collects all user selections and converts them to a JSON format
 * ready to send to the backend
 */

class SiteDataCollector {
  /**
   * Collect all user data from sessionStorage
   * @returns {Object} Complete site configuration object
   */
  static collectAllData() {
    const userProfile = JSON.parse(sessionStorage.getItem('userProfile') || '{}');
    const selectedPalette = JSON.parse(sessionStorage.getItem('selectedPalette') || '{}');
    const logo = sessionStorage.getItem('generatedLogo') || sessionStorage.getItem('uploadedLogo');
    const appName = sessionStorage.getItem('appName') || '';
    const catalog = sessionStorage.getItem('selectedCatalog') || 'modern';
    const productPage = sessionStorage.getItem('selectedProductPage') || 'grid';

    return {
      timestamp: new Date().toISOString(),
      siteStatus: 'confirmed',
      profile: {
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        businessName: userProfile.businessName || '',
        phone: userProfile.phone || ''
      },
      website: {
        appName: appName,
        catalog: catalog,
        productLayout: productPage
      },
      branding: {
        palette: {
          name: selectedPalette.name || 'Custom',
          description: selectedPalette.description || '',
          colors: selectedPalette.colors || []
        },
        logo: logo ? '(Logo data included - base64 encoded)' : 'Not provided'
      },
      logoData: logo || null
    };
  }

  /**
   * Get data without logo for preview/display
   * @returns {Object} Data object without binary logo
   */
  static getDataForDisplay() {
    const data = this.collectAllData();
    const displayData = {...data};
    displayData.logoData = displayData.logoData 
      ? `(Base64 image data - ${Math.round(displayData.logoData.length / 1024)}KB)` 
      : null;
    return displayData;
  }

  /**
   * Download JSON file to user's device
   * @param {string} filename - Optional filename (defaults to timestamp-based)
   */
  static downloadAsJSON(filename = null) {
    const data = this.collectAllData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `site-config-${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Send data to backend API
   * @param {string} apiEndpoint - Backend endpoint URL
   * @param {Object} options - Optional configuration
   * @returns {Promise<Object>} Response from backend
   */
  static async sendToBackend(apiEndpoint, options = {}) {
    const data = this.collectAllData();
    const defaultOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch(apiEndpoint, {
        ...defaultOptions,
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return {
        success: true,
        data: result,
        message: 'Data sent successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: `Error sending data: ${error.message}`
      };
    }
  }

  /**
   * Get formatted JSON string for display
   * @returns {string} Formatted JSON string
   */
  static getFormattedJSON() {
    const data = this.collectAllData();
    const displayData = {...data};
    displayData.logoData = displayData.logoData 
      ? `(Base64 image data - ${Math.round(displayData.logoData.length / 1024)}KB)` 
      : null;
    return JSON.stringify(displayData, null, 2);
  }

  /**
   * Get data summary for logging
   * @returns {Object} Summary object with key info
   */
  static getSummary() {
    const data = this.collectAllData();
    return {
      businessName: data.profile.businessName,
      appName: data.website.appName,
      catalogStyle: data.website.catalog,
      productLayout: data.website.productLayout,
      paletteColors: data.branding.palette.colors.length,
      hasLogo: !!data.logoData,
      timestamp: data.timestamp
    };
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SiteDataCollector;
}
