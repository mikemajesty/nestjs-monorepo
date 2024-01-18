import { expectType, expectDeprecated, expectNotDeprecated, expectDocCommentIncludes } from 'tsd'
import pinoElasticSearch, { DestinationStream, Options } from '../';

const options = {} as Options;

expectType<DestinationStream>(pinoElasticSearch())
expectType<DestinationStream>(pinoElasticSearch(options));

expectDeprecated(options['flush-bytes'])
expectNotDeprecated(options.flushBytes)
expectType<typeof options['flush-bytes']>(options.flushBytes)

expectDeprecated(options['flush-interval'])
expectNotDeprecated(options.flushInterval)
expectType<typeof options['flush-interval']>(options.flushInterval)

expectDeprecated(options['op_type'])
expectNotDeprecated(options.opType)
expectType<typeof options['op_type']>(options.opType)

expectDeprecated(options['es-version'])
expectNotDeprecated(options.esVersion)
expectType<typeof options['es-version']>(options.esVersion)

expectDeprecated(options.rejectUnauthorized)
expectNotDeprecated(options.tls?.rejectUnauthorized)
expectType<typeof options.rejectUnauthorized>(options.tls?.rejectUnauthorized)
