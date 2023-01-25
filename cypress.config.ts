import { defineConfig } from 'cypress';
import * as webpack from '@cypress/webpack-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';

async function setupNodeEvents(
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
    await addCucumberPreprocessorPlugin(on, config);

    on(
        'file:preprocessor',
        webpack({
            webpackOptions: {
                resolve: {
                    extensions: ['.ts', '.js'],
                },
                module: {
                    rules: [
                        {
                            test: /\.ts$/,
                            exclude: [/node_modules/],
                            use: [
                                {
                                    loader: 'ts-loader',
                                },
                            ],
                        },
                        {
                            test: /\.feature$/,
                            use: [
                                {
                                    loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                                    options: config,
                                },
                            ],
                        },
                    ],
                },
            },
        })
    );

    return config;
}

export default defineConfig({
    retries: 1,
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: true,
    chromeWebSecurity: false,
    animationDistanceThreshold: 30,
    defaultCommandTimeout: 5000,
    execTimeout: 60000,
    pageLoadTimeout: 60000,
    requestTimeout: 5000,
    responseTimeout: 30000,
    video: false,
    env: {
        development: true,
        refreshAttempts: 5,
    },
    waitForAnimations: false,
    reporter: 'spec',
    reporterOptions: {
        toConsole: true,
        overwrite: false,
        html: false,
        json: true,
        charts: true,
    },
    e2e: {
        excludeSpecPattern: ['*.js'],
        specPattern: '**/*.feature',
        // baseUrl: 'http://localhost:4200',
        setupNodeEvents,
    },
});
