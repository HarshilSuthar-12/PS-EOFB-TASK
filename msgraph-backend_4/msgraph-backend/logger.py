import logging
import logging.handlers

def setup_logger(name=None):  # Modified to accept an optional parameter
    logger = logging.getLogger(name if name else "msgraph-backend")
    logger.setLevel(logging.DEBUG)

    # Create a file handler which logs even debug messages
    fh = logging.handlers.RotatingFileHandler('msgraph-backend.log', maxBytes=(1048576*10), backupCount=5)
    fh.setLevel(logging.DEBUG)

    # Create a console handler with a higher log level
    ch = logging.StreamHandler()
    ch.setLevel(logging.ERROR)

    # Create formatter and add it to the handlers
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    fh.setFormatter(formatter)
    ch.setFormatter(formatter)

    # Add the handlers to the logger
    logger.addHandler(fh)
    logger.addHandler(ch)

    return logger

# Call the function to setup logger
logger = setup_logger()

try:
    # Placeholder for code that might throw an error
    pass
except Exception as e:
    logger.error("An error occurred: ", exc_info=True)