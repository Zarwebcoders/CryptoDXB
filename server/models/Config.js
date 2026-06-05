const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    roiRates: {
        type: Map,
        of: new mongoose.Schema({
            rate: Number,
            period: String,
            walletAddress: { type: String, default: '' },
            walletAddressTRC: { type: String, default: '' },
            walletAddressBEP: { type: String, default: '' }
        }),
        default: {}
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Ensure we only have one config document
configSchema.statics.getSingleton = async function () {
    let config = await this.findOne().sort({ createdAt: -1 });
    if (!config) {
        // Default Config
        config = await this.create({
            roiRates: {
                USDT: { 
                    rate: 8, 
                    period: 'Daily',
                    walletAddress: '0x1E5e82c99CC0B0fA49D36f0069c5DfBBF5270C61',
                    walletAddressBEP: '0x1E5e82c99CC0B0fA49D36f0069c5DfBBF5270C61',
                    walletAddressTRC: ''
                },
            }
        });
    }
    return config;
};

module.exports = mongoose.model('Config', configSchema);
